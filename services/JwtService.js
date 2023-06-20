const jwt = require('jsonwebtoken');
const config = require("config");

class JwtService {
    constructor(refreshPassword, accessPassword, refreshTime, accessTime) {
        this.refreshPassword = refreshPassword,
        this.accessPassword = accessPassword,
        this.refreshTime = refreshTime,
        this.accessTime = accessTime
    }

    generateTokens(payload) {
        const refreshToken = jwt.sign(payload, this.refreshPassword, {
            expiresIn: this.refreshTime
        });

        const accessToken = jwt.sign(payload, this.accessPassword, {
            expiresIn: this.accessPassword
        });
        return {
            accessToken,
            refreshToken
        };
    };

    async verifyRefresh(token) {
        return jwt.verify(token, this.refreshPassword, {});
    }

    async verifyAccess(token) {
        return jwt.verify(token, this.accessPassword, {});
    }
}

module.exports = new JwtService(
    config.get("refreshPassword"),
    config.get("accessPassword"),
    config.get("refreshTime"),
    config.get("refreshTime")
);