/* eslint-disable prettier/prettier */
import { fetchFileNames } from "./utils/fetchFileNames";
import { stat } from 'fs-extra';

export async function walkFolderTree(path: string): Promise<unknown> {
    const mappedFilesStatsPair = [];
    const matchedMapPairs = [];

    for await (const filename of await fetchFileNames(path)) {
        mappedFilesStatsPair.push({ key: filename, value: await stat(filename) });
    }

    if (mappedFilesStatsPair.length > 0) {
        for (const pair of mappedFilesStatsPair) {
            const result = mappedFilesStatsPair.filter((secondPair) => {
                return (
                    secondPair.key !== pair.key &&
                    secondPair.value.size === pair.value.size
                );
            });
            result.length > 0 ? matchedMapPairs.push(result[0].key) : '';
        }
        // return distinct records.
        return [...new Set(matchedMapPairs)];
    } else {
        console.log('\x1b[31m', '---------------------------------------------');
        console.log(' No photos were matched');
        console.log(' ---------------------------------------------');
        console.log('\x1b[0m');
    }
}