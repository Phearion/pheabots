import React, { FC, MouseEvent } from 'react';
import '../style/Home.css';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar/Navbar';

const inviteLink: string[] = [
    'https://discord.com/api/oauth2/authorize?client_id=980469187174604920&permissions=8&scope=bot%20applications.commands',
    'https://discord.com/api/oauth2/authorize?client_id=735989701978095800&permissions=8&scope=bot%20applications.commands'
];

const Home: FC = () => {
    const invite = (event: MouseEvent<HTMLButtonElement>) => {
        const carousel: Element = document.getElementsByClassName('carousel-item center')[0];
        const src: string | null = carousel.getElementsByTagName('img')[0].getAttribute('src');

        if (src && !src.includes('carousel-1')) {
            if (src.includes('carousel-2')) {
                window.open(inviteLink[0], 'pop-up', 'width=700,height=1000');
            }
            if (src.includes('carousel-3')) {
                window.open(inviteLink[1], 'pop-up', 'width=700,height=1000');
            }
        }
    };

    return (
        <div className="home">
            <Navbar />
            <Carousel />
            <div className="home-text">
                <p>Please select one of our bots!</p>
            </div>
            <div className="home-invite">
                <button className="home-invite-button" onClick={invite}>
                    Invite
                </button>
            </div>
        </div>
    );
}

export default Home;
