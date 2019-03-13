import {
    readdirSync,
    statSync,
} from 'fs';
import { join } from 'path';
/**
 *
 * @param dirPath 相对于工作目录
 * @param files
 */
export function listFileNames (dirPath: string, files: string[] = []) {
    const relativePaths = readdirSync(dirPath);
    relativePaths.forEach((relativePath) => {
        const absolutePath = join(dirPath, relativePath);
        const fileStat = statSync(absolutePath);
        if (fileStat.isFile()) {
            files.push(absolutePath);
        } else if (fileStat.isDirectory()) {
            listFileNames(absolutePath, files);
        }
    });
    return files;
}
