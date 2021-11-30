import { app } from "../index.js";
import bodyParser from "body-parser";
import getSchools, { createSchool, deleteSchool, getSchool, updateSchool } from "./db/school.js";
import { createAddress, deleteAddress, getAddressByParams, updateAddress } from "./db/address.js";
import { createStudent, deleteStudent, getStudentByFrNameAndCnNumber, getStudentById, getStudents, updateStudent } from "./db/student.js";

export default function registerAPI() {

  app.use(bodyParser.json());

  // get school details by id
  app.get("/school/get/:id", (request, response) => {
    const id = request.params.id;
    getSchool(id, (school) => {
      response.send(school)
    });
  });

  // delete school details by id  
  app.delete("/school/delete/:id", (req, res) => {
    const id = req.params.id;

    getSchool(id, (school) => {
      if (!school) {
        res.send({ message: "Failed to delete School" });
      } else {
        deleteSchool(id, (result) => {
          if (result) {
            deleteAddress(school.ADDRESSID, (addrResult) => {
              res.send(addrResult ? { message: "School deleted successfully" } : { message: "Failed to delete School" });
            })
          } else {
            res.send({ message: "Failed to delete School" });
          }
        })
      }
    });
  });

  // create school details
  app.post("/school/create", (req, res) => {
    const body = req.body;
    console.log(body)
    if (!body.address) {
      res.send({ message: "Address is mandatory to create a School" });
    }

    getAddressByParams(body.address, (address) => {
      if (!address) {
        createAddress({ ...body.address, isSchoolAddr: true }, (addr) => {
          console.log(addr)
          createSchool({ name: body.name, addressId: addr.ADDRESSID }, (result) => {
            res.send(result ? { message: "school created successfully" } : { message: "Failed to create school" });
          });
        })
      } else {
        createSchool({ name: body.name, addressId: address.ADDRESSID }, (result) => {
          res.send(result ? { message: "school created successfully" } : { message: "Failed to create school" });
        });
      }
    });
  });

  // update school details
  app.put('/school/update', (req, res) => {
    const body = req.body;
    console.log(body)
    updateSchool({ id: body.id, name: body.name }, (school) => {
      console.log(school)
      if (body.address) {
        updateAddress({ ...body.address, addressid: school.ADDRESSID }, (result) => {
          console.log(result)
          res.send(result ? { message: "school updated successfully" } : { message: "Failed to update School" })
        })
      } else {
        res.send({ message: "school updated successfully" })
      }
    });
  });

  app.get("/school/get-all", (req, res) => {
    getSchools((schools) => {
      const resutls = schools.map(school => {
        return {
          id: school.ID, name: school.NAME, address:
          {
            addressId: school.ADDRESSID, houseNo: school.HOUSENO,
            street: school.STREET, town: school.TOWN, district: school.DISTRICT,
            state: school.STATE, country: school.COUNTRY, is_address: school.IS_SCHOOL_ADDR
          }
        }
      })
      res.send(resutls)
    });
  });

  app.get('/student/get-all', (req, res) => {
    console.log("reached")
    getStudents((students) => {
      const results = students.map(student => {
        return {
          id: student.ID, firstName: student.FIRSTNAME, lastName: student.LASTNAME, contactNumber: student.CONTACTNUMBER, isAdmin: student.ISADMIN,
          school: { id: student.ID, name: student.NAME },
          address: { houseNo: student.HOUSENO, street: student.STREET, town: student.TOWN, district: student.DISTRICT, state: student.STATE, country: student.COUNTRY, is_school_address: student.IS_SCHOOL_ADDRESS }
        }
      })
      res.send(results);
    })
  });

  app.get("/student/:id", (req, res) => {
    const id = req.params.id;
    getStudentById(id, (student) => {
      const result = student ? {
        id: student.ID, firstName: student.FIRSTNAME, lastName: student.LASTNAME, contactNumber: student.CONTACTNUMBER, isAdmin: student.ISADMIN,
        school: { id: student.ID, name: student.NAME },
        address: { houseNo: student.HOUSENO, street: student.STREET, town: student.TOWN, district: student.DISTRICT, state: student.STATE, country: student.COUNTRY, is_school_address: student.IS_SCHOOL_ADDRESS }
      } : {'message': "Student not found" };
      res.send(result);
    })
  })  

  app.delete("/student/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    getStudentById(id, (student) => {
      console.log(student);
      if (student) {
        deleteStudent(id, (result) => {
          console.log(result);
          if (result) {
            deleteAddress(student.ADDRESSID, (addrResult) => {
              res.send(addrResult ? { message: "Student deleted successfully" } : { message: "unsuccessfull" })
            })
          }
          else {
            res.send({ message: "unsuccessfull" });
          }
        })
      }
      else {
        res.send({ message: "Student not found" });
      }
    })
  });

  app.post("/student/create", (req, res) => {
    const body = req.body;
    getStudentByFrNameAndCnNumber(body, (student) => {
      console.log(student);
      if (!student) {
        createAddress(body.address, (address) => {
          console.log(address);
          body.address.addressId = address.ADDRESSID;
          createStudent(body, (result) => {
            res.send(result ? { message: "Student created successfully" } : { message: "unsuccessfull" });
          })
        })
      }
      else {
        res.send({message: "Student already exists"})
      }
    })
  })

  app.put("/student/update", (req, res) => {
    const body = req.body;
    console.log(body);
    getStudentByFrNameAndCnNumber(body, (student) => {
      if(student){
        updateStudent(body, (result) => {
          console.log(result);
          body.address.addressid = student.ADDRESSID;
          if (body.address) {
            updateAddress(body.address, (address) => {
              res.send(address ? { message: "Student updated successfully" } : { message: "unsuccessfull" });
            })
          }
          else {
            res.send({ message: "Student updated successfully" })
          }
        })
      } else {
        res.send({ message: "Student not found" })
      }
      
    })
  })

}
