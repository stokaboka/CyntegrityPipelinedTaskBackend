import { Injectable } from '@nestjs/common';
import { spawn } from "child_process";

@Injectable()
export class TaskRunnerService {

    runPipeline(pipeline: any) {

    }

    runTask(task: any) {

    }

    runLS(): Promise<any> {
        let out: any = {
            data: null,
            code: 0
        };
        return new Promise((resolve, reject) => {
            const ls = spawn('ls', ['-lh', '/usr']);

            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                out.data = data;
            });

            ls.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                reject(data);
            });

            ls.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                out.code = code;
                resolve(out)
            });
        });
    }
}
