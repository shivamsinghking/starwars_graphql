var {GraphQLServer} = require('graphql-yoga');
var fetch = require('node-fetch');

// // Construct a schema, using GraphQL schema language

// var typeDefs = `
 
//   type Query {
//       greeting : String,
//       getPerson(id : Int!) : person
//   }
//   type person {
//     name : String,
//     height :String,
//     mass : String,
//     films = [Film]
//   }

//   type Film {
//       title : String,
//       episodes : String,
//       directors : String,
//       hair_color : String
//   }
// `;

// const resolvers  = {
//  Query :  {
//      greeting :() => {
//          return "hello everyone";
//      },
//      getPerson : async (args) => {
//         var response = await fetch(`https://swapi.dev/api/people/${args.id}/`)
//          return  response.json();
//      }
//  },
//  person : {
//       films : (ParentRoot) =>{
          
//         const promises =  ParentRoot.films.map((data)=> {
//                 var res = fetch(data)
//                 return res.json();
//            })
//           return Promise.all(promises); 
//       } 
//  }
// }

// const server = new GraphQLServer({ typeDefs, resolvers })
// server.start(() => console.log('Server is running on localhost:4000'));

const typeDefs = `

  type Query {
      greeting : String,
      getPerson(id : Int!) : Person
  }
  type Person {
    name : String,
    height :String,
    mass : String,
    films : [Film]
  }

  type Film {
      title : String,
      episodes : String,
      director : String,
      hair_color : String
  }
`

const resolvers  = {
 Query :  {
     greeting :() => {
         return "hello everyone";
     },
     getPerson : async (_,{id}) => {
        var response = await fetch(`https://swapi.dev/api/people/${id}/`);
         return  response.json();
     }
 },
 Person : {
      films : parent => {
          
        const promises =  parent.films.map( async data => {
                var res = await fetch(data);
                return res.json();
           });
          return Promise.all(promises); 
      } 
 }
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("server running on local 4000"));