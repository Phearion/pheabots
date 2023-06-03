import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import MenuPage from "./pages/Dashboard/MenuPage";
import {GuildContext} from "./utils/contexts/GuildContext";

function App() {

    const [guildId, setGuildId] = React.useState<string>('');
    const updateGuildId = (id: string) => setGuildId(id);

    return (

        <GuildContext.Provider value={{guildId, updateGuildId}}>

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/dashboard/:guildId" element={<div>Dashboard of {guildId}</div>} />
                </Routes>
            </Router>

        </GuildContext.Provider>


      )

}

export default App;
