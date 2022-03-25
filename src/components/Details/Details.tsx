import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import './Details.css';

export function Details() {
    const {id} = useParams();
    const animals = JSON.parse(localStorage.getItem("animals") || "");
    const currentAnimal = animals.find(function(a: IAnimal) {
        return a.id == Number(id);
    });
    const [animal, setAnimal] = useState<IAnimal>(currentAnimal);

    const feedAnimal = () => {
        setAnimal({...animal, lastFed: new Date(), isFed: true });
    };

    useEffect(() => {
        const animalIndex = animals.findIndex(function(a: IAnimal) {
            return a.id == Number(id);
        });
        animals[animalIndex] = animal;
        localStorage.setItem("animals", JSON.stringify(animals));
    }, [animal]);


    return (
        <>
        <Link className="Back" to="/">&#8592; Tillbaka till startsidan</Link>
        <div className="Infodetails">
            <p className="InfoanimalName">Namn: {animal.name}</p>
            <p className="Infoinfo">Latinskt namn: {animal.latinName}</p>
            <p className="Infoinfo">Ålder: {animal.yearOfBirth}</p>
            <p className="Infoinfo">{animal.longDescription}</p>
            <img src={animal.imageUrl} alt=""></img>
            <p className="Infoinfo">Medicin: {animal.medicine}</p>

            <div className="Feed">
                <button onClick={feedAnimal} disabled={animal.isFed}>Mata djur</button>
                {animal.isFed && (<p>Djuret är matat!</p>)}
            </div>

            <p className="Infoinfo">Senast matad: {animal.lastFed.toLocaleString()}</p>
        </div>
        </ >
    )
}
