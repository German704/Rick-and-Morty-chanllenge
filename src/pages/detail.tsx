import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAPIService } from '../service/api-services';
import { character } from '../entities/charecter';

export default function Detail() {
    const { id } = useParams();
    const [character, setCharacter] = useState<character>();
    const api = useAPIService();

    useEffect(() => {
        async function character() {
            const result = await api.getCharacter(id as string);
            setCharacter(result);
        };

        character();
    }, [api, id]);
    return (
        <article className='border border-green-300 p-4 rounded-lg bg-white'>
            <header className='flex items-center gap-4'>
                <figure>
                    <img
                        src={character?.image}
                        alt={character?.name}
                        className='w-[100px] rounded-lg'
                    />
                    <figcaption>{character?.name}</figcaption>
                </figure>
                <h2>{character?.name}</h2>
            </header>

            <section>
                <h3>General Info</h3>
                <ul>
                    <li className='mb-2'><strong>ID:</strong> {character?.id}</li>
                    <li><strong>Status:</strong> {character?.status}</li>
                    <li><strong>Species:</strong> {character?.species}</li>
                    <li><strong>Type:</strong> {character?.type || "N/A"}</li>
                    <li><strong>Gender:</strong> {character?.gender}</li>
                </ul>
            </section>

            <section>
                <h3>Origin</h3>
                <p>
                    <a href={character?.origin.url} target="_blank" rel="noopener noreferrer">
                        {character?.origin.name}
                    </a>
                </p>
            </section>

            <section>
                <h3>Location</h3>
                <p>
                    <a href={character?.location.url} target="_blank" rel="noopener noreferrer">
                        {character?.location.name}
                    </a>
                </p>
            </section>

            <section>
                <h3>Episodes</h3>
                <ul>
                    {character?.episode.map((ep, index) => (
                        <li key={index}>
                            <a href={ep} target="_blank" rel="noopener noreferrer">
                                Episode {index + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            <footer>
                <p>
                    <strong>Profile URL:</strong>{" "}
                    <a href={character?.url} target="_blank" rel="noopener noreferrer">
                        {character?.url}
                    </a>
                </p>
                <p><strong>Created:</strong> {character?.created}</p>
            </footer>
        </article>
    );
}
