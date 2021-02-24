import React from 'react';
import AdminOptions from "./AdminOptions";
import ClientOptions from "./ClientOptions";

const Menu = (props) => {
    const { user } = props;
    let options = null;
    if(!!user){
        if(user.profile.user_rol.nombre === "Administrador"){
            options = <AdminOptions/>
        }else if(user.profile.user_rol.nombre === "Cliente"){
            options = <ClientOptions/>
        }
    }
    return (
        <div className="h-100 d-flex align-items-center">
            {options}
        </div>
    );
};

export default Menu;