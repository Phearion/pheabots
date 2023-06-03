// server.ts

export const startDiscordLogin = async () => {

    const discordAuthUrl = `api/auth/login`;
    window.open(discordAuthUrl, '_blank');
};




