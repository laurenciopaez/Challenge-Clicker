const path = require("path");
const fs = require("fs").promises;

const apiController = {
  getData: async (req, res) => {
    
    const { username } = req.query;
    
    if (!username) {
        return res.status(400).json({ error: 'username needed'});
    }

    const dbContent = await loadDBcontent();
    
    const usersArray = Object.values(dbContent.users)
    const userExistist = usersArray.find( (user) => user.username === username)
    
    if (!userExistist) {
        return res.status(404).json( { error: 'User not found'});
    }

    let tablaContenido = [];

    usersArray.map( (user) => {
        tablaContenido.push(user.counter)
    })

    res.json({ username: username, counter: userExistist.counter, allCounters: tablaContenido})


  },

  postUser: async (req, res) => {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const dbContent = await loadDBcontent();
    console.log(dbContent)
    const userExistist = dbContent.users.find( (user) => user.username === username)

    if (!userExistist) {
        dbContent.users.push({
            username: username,
            counter: 0,
        });

        try {
            await fs.writeFile(dbFilePath, JSON.stringify(dbContent));
            res.json({ username: username})
        } catch( error) {
            console.log(error);
            res.status(500).json({ error: ' Internal server error '})
        }
    };

  },

  putCounter: async (req, res) => {
    const { data} = req.body;
    //ESTE ES EL PRIMER COUNTER
    console.log('aca va el counter')
    console.log(data.counter)
    if (!data.userName || isNaN(data.counter)) {
      return res.status(400).json({ error: 'Invalid input. Username and a valid amount are required.' });
    }
  
    const dbContent = await loadDBcontent();
    
    const userToUpdate = dbContent.users.find((user) => user.username === data.userName);
    ///
    console.log(userToUpdate);
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    } 
    userToUpdate.counter += parseInt(data.counter);

    try {
      // Guardar los cambios en el archivo
      await fs.writeFile(dbFilePath, JSON.stringify(dbContent));
      res.json({ username: data.userName, counter: userToUpdate.counter });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

const dbFilePath = path.join(__dirname, "database.json");

async function loadDBcontent() {
  try {
    const fileContent = await fs.readFile(dbFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { users: [] };
    }
    console.error(error.message);
    throw error;
  }
}

module.exports = apiController;
