import './PokeCard.css'
import{useEffect, useState} from 'react';
import fireimg from '../pics/fire.jpg'
import grassimg from '../pics/grass.jpg';
import lightningimg from '../pics/lightning.jpg'
import waterimg from '../pics/water.jpg'
import groundimg from '../pics/groundimg.jpg'
import bugimg from '../pics/bugimg.jpg'
import normalimg from '../pics/normalimg.jpg'
import poisonimg from '../pics/poisonimg.jpg'

export default function PokeCard(props){

    const abilities = props.abilities;
    const type = props.type;
    
const cardStyles =({
    fire: {
        background:"linear-gradient(to bottom right, red,yellow,red)"
    },
    grass: {
        background:"linear-gradient(to bottom right, green,yellow,green)"
    },
    water: {
        background:"linear-gradient(to bottom right, blue,lightgrey,blue)"
    },
    electric: {
       background:"linear-gradient(to bottom right, yellow,white,yellow)"
    },
    poison:{
        background:"linear-gradient(to bottom right, grey,green)"
    },
    ground:{
        background:"linear-gradient(to bottom right, brown,lightgreen)"
    },
    normal:{
        background:"linear-gradient(to bottom right, grey,lightgrey)"
    },
    bug:{
        background:"linear-gradient(to bottom right, lightblue,brown)"
    }

})

const imgBackground =({
    fire: {
        backgroundImage: `url(${fireimg})`
    },
    grass: {
        backgroundImage: `url(${grassimg})`
    },
    water: {
       backgroundImage: `url(${waterimg})`
    },
    electric: {
       backgroundImage: `url(${lightningimg})`
    },
    poison:{
        backgroundImage: `url(${poisonimg})`
    },
    ground:{
        backgroundImage: `url(${groundimg})`
    },
    normal:{
        backgroundImage: `url(${normalimg})`
    },
    bug:{
       backgroundImage: `url(${bugimg})`
    }

})
    
    
    const [effectList, seteffectList] = useState([]);
    const [abiliList, setabiliList]= useState([]);
    
    useEffect(()=>{
        const extractedAbilities = abilities.slice(0,2).map((ability) => ability["ability"]);
        setabiliList(extractedAbilities);
    },[abilities])

    useEffect(()=>{
        const fetchdata = async()=>{
            const result = await Promise.all(
                abiliList.map((ele)=> fetch(ele["url"]).then(response=>response.json()))
            )

            seteffectList(result.map((ele,i)=>ele["effect_entries"][i]["effect"]));
        }

        if(abiliList.length > 0)
        {
            fetchdata();
        }
    }, [abiliList])
    
    return(
        <div className="PokeCard" style={cardStyles[type]}>
            <div className="card-top">
                <div className="card-design-ele">
                    💣
                </div>
                <div className="name">
                    <p>{props.name}</p>
                </div>
                <div className="hp">
                    <p>hp: {props.hp}</p>
                </div>
            </div>
            <div className="card-img" style={imgBackground[type]}>
                <img className="image" src={props.imagelink} alt="new"/>
            </div>
            <div className="abilities">
                {abiliList.map((ele,i)=>{
                    return(
                        <div key={`${ele} - ${i}`}className='ability'>
                            <p style={{fontSize:9, fontWeight:'bold'}}>{ele["name"]}</p> 
                           <p style={{fontSize: 5}} align="justify"> {effectList[i]}</p>
                        </div>
                    )
                })}
            </div>
        <div className="end-section"></div>
    </div>
    )
}
