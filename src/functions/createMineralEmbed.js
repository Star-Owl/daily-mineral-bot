import { EmbedBuilder } from 'discord.js'
import minerals from '../data/minerals.json' assert { type: 'json' }
import pck from '../../package.json' assert { type: 'json' }

export const createMineralEmbed = (mineral, author) => {
    return new EmbedBuilder()
        .setColor('#4F83E2')
        .addFields(
            { name: 'Type', value: mineral.kind || 'N/A', inline: true },
            { name: 'Class', value: mineral.class || 'N/A', inline: true },
            { name: 'Chemical Formula', value: mineral.chemicalFormula || 'N/A', inline: true },
            { name: 'Hardness', value: mineral.hardness || 'N/A', inline: true },
            { name: 'Density', value: mineral.density || 'N/A', inline: true },
            { name: 'Streak', value: mineral.streak || 'N/A', inline: true },
            { name: 'Luster', value: mineral.luster || 'N/A', inline: true },
            { name: 'Cleavage', value: mineral.cleavage || 'N/A', inline: true },
            { name: 'Fracture', value: mineral.fracture.join(', ') || 'N/A', inline: true },
            { name: 'Colors', value: mineral.colors.join(', ') || 'N/A', inline: true },
            { name: 'Crystals', value: mineral.crystals || 'N/A', inline: true },
            { name: 'Cut', value: mineral.cut.join(', ') || 'N/A', inline: true },
            { name: 'Occurrences', value: mineral.occurrences.join(', ') || 'N/A', inline: true }
        )
        .setTimestamp()
        .setFooter({
            text: `version: ${pck.version} | minerals: ${minerals.length}\n\n author: ${author.globalName} (@${author.username})`,
        })
}
