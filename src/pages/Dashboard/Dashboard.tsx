import {GuildContext} from "../../utils/contexts/GuildContext";
import {useContext} from "react";

export const Dashboard = () => {
    const { guildId } = useContext(GuildContext);
    return <div>Dashboard of {guildId}</div>
}