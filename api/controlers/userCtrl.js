import { formatDate } from "./index.js";

export default (userRepo, User) => {

  const listUsers = (_, res) => {
    let users = userRepo.listUsers();
    res.send({
      data: users
    })
  };

  const addUser = (req, res) => {
    let data = req.body;

    if(!data.phone.match(/(0033|\+33|0)+[0-9]{9}/)){
      return res.status(400).send({
        error: 'Phone malformated'
      })
    }

    let formatedBirthdate = formatDate(data.birthDate);
    let user = userRepo.addUser(
      new User(
        data.id,
        data.lastName,
        data.firstName,
        formatedBirthdate,
        data.address,
        data.phone,
        data.email
      )
    );
    res.status(201).send({
      data:user
    })
  };

  const updateUser = (req, res) => {
    let {id, lastName, firstName, birthDate, address, phone, email} = req.body;
    let userId = req.params.uuid;
    
    if(!phone.match(/(0033|\+33|0)+[0-9]{9}/)){
      return res.status(400).send({
        error: 'Phone malformated'
      })
    }

    // Get birthDate as a YYYY-MM-DD format
    let formatedBirthdate = formatDate(birthDate);

    let updatedUser = userRepo.updateUser(
      userId,
      new User(id, lastName, firstName, formatedBirthdate, address, phone, email)
    )

    res.status(200).send({
      data: updatedUser
    });
  }

  const deleteUser = (req, res) => {
    let userId = req.params.uuid;

    let deletedUser = userRepo.deleteUser(userId);
    if(deletedUser){
      return res.status(200).send({
        meta: {
          deletedUser
        }
      });
    }

    res.status(404).send({
      error: `User with uuid ${userId} not found`
    });
  }
  return {
    listUsers,
    addUser,
    updateUser,
    deleteUser
  }
}
