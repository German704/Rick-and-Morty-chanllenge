import { useEffect, useMemo, useState } from 'react'
import { useAPIService } from '../service/api-services'
import { character } from '../entities/charecter';

export default function Home() {
    const [list, setList] = useState<character[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState<"A-Z" | "Z-A">("A-Z");
    const api = useAPIService();

    const filteredProjects = useMemo(
        () =>{
          const listFilter = list.filter((item) =>{
            const values = Object.values({name: item.name, species: item.species, status: item.status});
            return values.some(value => value.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()));
          })
          return listFilter.sort((a, b) => sort === "A-Z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        },
        [list, searchTerm, sort]
    );

    useEffect(() => {
        async function characterList() {
            const result = await api.getCharacterList();
            setList(result)
        };

        characterList();
    }, [api]);


    return (
        <section className='w-full flex flex-col gap-4'>
            <section className='w-full flex items-center justify-between'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-3/4 mb-1"
                />
                <button className='rounded-lg p-2 bg-green-300 text-md font-medium' onClick={() => setSort(sort === "A-Z" ? "Z-A" : "A-Z")}>
                    {sort}
                </button>
            </section>
            <section className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-4'>
                {
                    filteredProjects.length && filteredProjects.map(item => (
                        <a href={`/character/${item.id}`} key={item.id} className='h-full hover:w-[104%] hover:h-[104%] hover:transition-all hover:duration-500 rounded-lg border-2 border-green-300 bg-white shadow-md flex flex-wrap justify-between p-2 gap-2'>
                            <img src={item.image} alt={item.image} className='rounded-lg w-full' />
                            <div className='w-full flex flex-col'>
                                <h1>{item.name}</h1>
                                <hr className='w-full bg-gray-400' />
                                <span>Specie: {item.species}</span>
                            </div>
                        </a>
                    ))
                }
            </section>
        </section>
    )
}
