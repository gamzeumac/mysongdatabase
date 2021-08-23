import React, { useState } from 'react';
import initialSongs from '../data/songs.json';
import { Switch, Route, Link } from "react-router-dom";
import About from './About';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { SiDiscogs } from 'react-icons/si';


function Home() {
    const [searchText, setSearchText] = useState('');
    const [songs, setSongs] = useState(initialSongs);

    const searchSongs = (userSearchText) => {
        setSearchText(userSearchText);
    }

    const toggleDescription = (index) => {
        songs[index].showDescription = !songs[index].showDescription;
        setSongs([...songs]);
    }

    const authorsContainsSearchText = (song) => {
        let foundSearchText = false;
        song.author.forEach((auth) => {
            if (auth.toLowerCase().includes(searchText.toLowerCase())) {
                foundSearchText = true;
            };
        });
        return foundSearchText;
    }
    return (<>
        <div className="main">
            <div className="section glass">


                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/"><div class="dashboard">
                    <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        
                    </ul>
                </nav>
                        <h1 className="title"><BsMusicNoteBeamed className="iconMusic" /> Song Database, ver 3.0</h1></div>
                        <div class="links">
                            <div>
                                <input type="text" className="inputBox" onChange={((e) => searchSongs(e.target.value))} />
                            </div>
                            <p>There are {songs.length} songs and {songs.filter((song) => song.showDescription).length} are showing.</p>
                            <div className="list">
                                {songs.map((song, index) => {
                                    return (
                                        <>
                                            {(authorsContainsSearchText(song) || song.name.toLowerCase().includes(searchText.toLowerCase())) && (
                                                <div className="wrapper">
                                                    <div className="iconRecord"><SiDiscogs /></div>
                                                    <div className="textRecord" onClick={() => toggleDescription(index)}>{song.author.join(', ')} - {song.name}
                                                        {song.showDescription && (
                                                            <div>{song.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )
                                })}
                            </div>
                        </div>

                    </Route>
                </Switch>






            </div>
                    <div className="circle1"></div>
        <div className="circle2"></div>
        </div>

    </>

    )
}

export default Home