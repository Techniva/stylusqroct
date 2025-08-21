import { execFile } from "child_process";
import path from "path";

export function mergeQRWithBackground(qrPath: string, bgPath: string, outputPath?: string) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "scripts", "image_processor.py");

    execFile("python3", [scriptPath, "merge", qrPath, bgPath, outputPath || ""], (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(stderr || error.message));
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch {
        resolve(stdout);
      }
    });
  });
}
