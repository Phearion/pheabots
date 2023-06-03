import {GuildContext} from "../../utils/contexts/GuildContext";
import {useContext} from "react";
import {mockGuilds} from "../../__mocks__/guilds";
import {useNavigate} from "react-router-dom";
// import style/MenuPage.css from cwd
import '../../style/MenuPage.css';

export const MenuPage = () => {

    const navigate = useNavigate();
    const {updateGuildId} = useContext(GuildContext);

    return (

        <div className="guild-selection">

            <h2>Select a server please!</h2>

            <div className="guild-list">
                {mockGuilds.map(guild => (
                    <div className="guild" key={guild.id} onClick={() => {
                        updateGuildId(guild.id);
                        navigate(`/dashboard/${guild.id}`);
                    }}>
                        <img src={guild.icon} alt={guild.name} width="70vw" height="70vh" />
                        <span>{guild.name}</span>
                    </div>
                ))}
            </div>


        </div>

    );


};
export default MenuPage;