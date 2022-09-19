const dotenv = require('dotenv').config()
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING,{

    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

  module.exports = {
    createChampion: (req,res) => {
        console.log(req.body)
        sequelize.query(`
        INSERT INTO champions
        (name,difficulty,character_id)
        VALUES
        ('${req.body.name}',${req.body.difficulty},${req.body.character_id});
        `)
        .then((dbRes) =>{
            // console.log(dbRes)
            res.status(200).send(dbRes[0])
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send("Working")

        })
    },
    getCharacter: (req,res) => {
        sequelize.query(`
        SELECT * FROM characters;
        `)
        .then((response) => {
            const returnData = response[0]
            res.status(200).send(returnData)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send('Okay')
        })
    },
    getChampion:(req,res) => {
        sequelize.query(`
        SELECT champions.champion_id, champions.name, champions.difficulty, characters.character_id, characters.name AS charname
        FROM champions
        JOIN characters
        ON champions.character_id = characters.character_id;
        `)
        .then((dbRes) => {
          
            res.status(200).send(dbRes[0])
        })
        .catch((error) => {
            console.log(error)
           // res.status(500).send('No')
        })
    },
    deleteChampion:(req,res) => {
        const id = req.params.id
        sequelize.query(` 
        DELETE FROM champions WHERE champion_id = ${id};
        `)
        .then((dbRes) => {
      
            res.status(200).send(dbRes[0])
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send('deleted')
        })
    },
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists champions;
        drop table if exists characters;

       CREATE TABLE characters (
            character_id serial primary key, 
            name varchar
        );
       CREATE TABLE champions(
        champion_id SERIAL PRIMARY KEY,
        name VARCHAR,
        difficulty INTEGER,
         character_id INTEGER REFERENCES characters(character_id)
       );
       insert into characters (name)
       values 
       ('Katarina'),
       ('Jinx'),
       ('Sona'),
       ('Garen'),
       ('Kayn'),
       ('Lucian');
       `).then(() => {
        console.log('DB seeded!')
        res.sendStatus(200)
    }).catch(err => console.log('error seeding DB', err))
}
};