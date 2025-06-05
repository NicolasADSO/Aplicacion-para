export const loginUser = async (email, password) =>{
    return new Promise ((resolve, reject) => {
        if(email === "admin" && password === "admin123"){
            resolve("administrador");
        }else if(email === "user" && password === "user123"){
            resolve("usuario");
        }else{
            reject(new Error("Credencial incorrectas"));
        }
    }) 
}

export const registerUser = async (userName, email, password) => {
    return new Promise((resolve, reject)=> {
        if(!userName|| !email || !password){
            reject(new Error("Todos los campos son obligatorios"));
        }else{
            console.log("Usuario registrado:", { userName, email, password });
            resolve('registro exitoso');
        }

    })
}