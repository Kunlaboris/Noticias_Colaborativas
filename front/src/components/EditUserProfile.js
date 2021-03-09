import React, { useState } from 'react';

export const EditUserProfile = () => {
  return (
    <>
      <div>
        <div>
          <h2>Edita tu perfil</h2>
        </div>
        <div className="photoProfile">
          <img src="" />
        </div>
        <div>
          <form>
            <div>
              <label htmlFor="firstname">Nombre</label>
              <input name="firstname" type="text"></input>
            </div>
            <div>
              <label htmlFor="lastname">Primer apellido</label>
              <input name="lastname" type="text"></input>
            </div>
            <div>
              <label htmlFor="surname">Segundo apellido</label>
              <input name="surname" type="text"></input>
            </div>
            <div>
              <label htmlFor="biography">Biografia</label>
              <textarea name="biography" type="text"></textarea>
            </div>
            <button type="submit">Guardar cambios</button>
            <button type="submit">Borrar formulario</button>
          </form>
        </div>
      </div>
    </>
  );
};
