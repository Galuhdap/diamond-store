export const validatePassword  = (password: string, password2: string) => {
    
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

    const passwordLength = password.length;
    
    if(!password || !password2) throw Error("Harus Diisi");
    if(password !== password2) throw Error("password tidak sama");
    if(passwordLength < 8) throw Error("password kurang anjang");
    if(!regex.test(password))  throw Error("password kurang kuat");

}
export const validateEmail = (email:string)=> {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(!email) throw Error("Harus Diisi");
     if(!pattern.test(email)) throw Error("Check Your Email!!");
}