/* eslint-disable prettier/prettier */
import { resolve } from 'path';
import { readdir, stat } from 'fs-extra';

export async function fetchFileNames(baseDirectory: string): Promise<any> {
    try {
        const subdirectories = await readdir(baseDirectory);
        for (const directory of subdirectories) {
            const res = resolve(baseDirectory, directory);
            const statObj = (await stat(res));
            if (statObj) {
                if (statObj.isDirectory()) {
                    return fetchFileNames(res);
                } else {
                    return res;
                }
            }
        }
    }
    catch (e) {
        console.log("\x1b[31m", 'Expected folder named -> photos <- not found - \n please make sure the photos folder is in the same folder you run this command \n');
        console.log("\x1b[0m", e);
    }
}