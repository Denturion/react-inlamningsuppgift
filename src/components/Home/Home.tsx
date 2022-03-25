import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../../models/IAnimal";
import './Home.css';
import { Link } from "react-router-dom";

export function Home() {
    const [animals, setAnimals] = useState<IAnimal[]>([]);

    
    useEffect(() => {
        axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then(response => {
            if(!localStorage.getItem('animals')){
                localStorage.setItem('animals', JSON.stringify(response.data));
            }

            setAnimals(JSON.parse(localStorage.getItem('animals') || '').map((animal:IAnimal) => {

            return(
                <Link key={animal.id} className="details" to={`/details/${animal.id}`} >
                    <p className="animalName">{animal.name}</p>
                    <img src={animal.imageUrl} alt=""></img>
                    <p className="info">{animal.shortDescription}</p>
                </Link>
            );
        }));
    });
    }, []);

    return (
        <>
        <header><h1>Klicka på ett djur för mer information!</h1></header>
        <div className="animalInfo">
            {animals}
        </div>
        </>
    );
}