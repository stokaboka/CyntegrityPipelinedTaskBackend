/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

module.exports = {
    apps : [{
        name: "cpt",
        script: "./dist/main.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        },
	cwd: "/opt/webapps/cpt"
    }]
}
