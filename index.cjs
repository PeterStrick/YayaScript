const { REST } = require('@discordjs/rest');
const { WebSocketManager } = require('@discordjs/ws');
const { GatewayDispatchEvents, InteractionType, Client, Utils } = require('@discordjs/core');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const rest = new REST().setToken(token);
const gateway = new WebSocketManager({
    token,
    intents: 0,
    rest
});
const client = new Client({ rest, gateway });
client.on(GatewayDispatchEvents.Ready, async ({ data }) => {
    console.log(`✓ Connected! ${data.user.username}#${data.user.discriminator}`);
});

client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
    if ((interaction.type !== InteractionType.ApplicationCommand ||
        !Utils.isChatInputApplicationCommandInteraction(interaction))
        && interaction.type !== InteractionType.ApplicationCommandAutocomplete)
        return;

    //console.log(interaction.data.id)
    const respond = (data) => api.interactions.reply(interaction.id, interaction.token, data);
    const option = (name) => interaction.data.options.find(o => o.name === name)?.value;
    const userID = interaction.member?.user.id ?? interaction.user.id;

    //Code
    const secrets = [
        ['00101110', 'sadcat.gif '],
        ['00100001', ':D '],
        ['00101100', 'but... '],
        ['00111111', 'wah.. '],
        ['00', 'yaya '],
        ['01', 'wuhh '],
        ['10', 'helo '],
        ['11', 'hru ']
    ];

    if (interaction.data.name === "yaya") {
        const wuhh = option('text');
        const binary = wuhh.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
        let guhh = '', i = 0;
        while (i < binary.length) {
        let yuhuh = false;
        for (let [bin, secret] of secrets) {
            if (binary.startsWith(bin, i)) {
                guhh += secret;
                i += bin.length;
                yuhuh = true;
                break;
            }
        }
            if (!yuhuh) i++;
        }

        respond({ content: guhh.trim(), ephemeral: true });
    } else if (interaction.data.name === "zaza") {
        const wuhh = option('text');
        let binary = wuhh.split(' ').reduce((mreow, mrrp) => {
            for (let [binary, secret] of secrets) {
                if (mrrp + ' ' === secret) {
                    return mreow + binary;
                }
            }
            return mreow;
        }, '');
        let owo = '';
        for (let i = 0; i < binary.length; i += 8) {
            let byte = binary.slice(i, i + 8);
            owo += String.fromCharCode(parseInt(byte, 2));
        }
        respond({ content: owo, ephemeral: true });
    }
    
});

gateway.connect();