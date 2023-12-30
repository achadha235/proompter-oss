import { IComponentNodes, IComponentCredentials } from "flowise/dist/Interface";
import path from "path";
import { Dirent } from "fs";
import { getNodeModulesPackagePath } from "flowise/dist/utils";
import { promises } from "fs";
import { ICommonObject } from "flowise-components";

export class NodesPool {
  componentNodes: IComponentNodes = {};
  componentCredentials: IComponentCredentials = {};
  private credentialIconPath: ICommonObject = {};

  async initialize() {
    await this.initializeNodes();
    await this.initializeCredentials();
  }

  async initializeNodes() {
    // let location = require.resolve("flowise-components");
    // location = path.join(location, "..", "..", "nodes");
    // const modLocation = path.join(
    //   location,
    //   "agents/AirtableAgent/AirtableAgent.js"
    // );
    // console.log(modLocation);
    // const mod = require(modLocation);

    // console.log(mod);

    let packagePath = require.resolve("flowise-components");
    const nodesPath = path.join(packagePath, "..", "..", "nodes");
    const nodeFiles = await this.getFiles(nodesPath);

    return Promise.all(
      nodeFiles.map(async (file) => {
        if (file.endsWith(".js")) {
          const nodeModule = require(file);

          if (nodeModule.nodeClass) {
            const newNodeInstance = new nodeModule.nodeClass();
            newNodeInstance.filePath = file;

            // Replace file icon with absolute path
            if (
              newNodeInstance.icon &&
              (newNodeInstance.icon.endsWith(".svg") ||
                newNodeInstance.icon.endsWith(".png") ||
                newNodeInstance.icon.endsWith(".jpg"))
            ) {
              const filePath = file.replace(/\\/g, "/").split("/");
              filePath.pop();
              const nodeIconAbsolutePath = `${filePath.join("/")}/${
                newNodeInstance.icon
              }`;
              newNodeInstance.icon = nodeIconAbsolutePath;

              // Store icon path for componentCredentials
              if (newNodeInstance.credential) {
                for (const credName of newNodeInstance.credential
                  .credentialNames) {
                  this.credentialIconPath[credName] = nodeIconAbsolutePath;
                }
              }
            }

            const skipCategories = ["Analytic"];
            if (!skipCategories.includes(newNodeInstance.category)) {
              this.componentNodes[newNodeInstance.name] = newNodeInstance;
            }
          }
        }
      })
    );
  }

  private async initializeCredentials() {
    let packagePath = require.resolve("flowise-components");
    const nodesPath = path.join(packagePath, "..", "..", "credentials");
    const nodeFiles = await this.getFiles(nodesPath);
    return Promise.all(
      nodeFiles.map(async (file) => {
        if (file.endsWith(".credential.js")) {
          const credentialModule = await require(file);
          if (credentialModule.credClass) {
            const newCredInstance = new credentialModule.credClass();
            newCredInstance.icon =
              this.credentialIconPath[newCredInstance.name] ?? "";
            this.componentCredentials[newCredInstance.name] = newCredInstance;
          }
        }
      })
    );
  }

  /**
   * Recursive function to get node files
   * @param {string} dir
   * @returns {string[]}
   */
  private async getFiles(dir: string): Promise<string[]> {
    const dirents = await promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent: Dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? this.getFiles(res) : res;
      })
    );
    return Array.prototype.concat(...files);
  }
}
