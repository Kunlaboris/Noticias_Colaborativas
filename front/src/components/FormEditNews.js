import React from 'react';
import './FormEditNews.css';

export const FormEditNews = () => {
  return (
    <section id="new-post" class="new">
      <div class="container">
        <form>
          <div class="row">
            <h4>Titular:</h4>
            <div class="input-group input-group-icon">
              <input type="text" placeholder="Titular (200 caracteres)" />
              <div class="input-icon">
                <i class="fa fa-heading"></i>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-half">
              <h4>Tema:</h4>
              <div class="input-group">
                <input type="file" />
                <div class="input-icon">
                  <i class="fa fa-user"></i>
                </div>
              </div>
            </div>
            <div class="col-half">
              <h4>Categoría</h4>
              <div class="input-group">
                <select>
                  <option>Educación</option>
                  <option>Ciencia</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <h4>Payment Details</h4>

            <div class="input-group input-group-icon">
              <textarea placeholder="Card Number" />
            </div>
            <div class="col-half">
              <div class="input-group input-group-icon">
                <input type="text" placeholder="Card CVC" />
                <div class="input-icon">
                  <i class="fa fa-user"></i>
                </div>
              </div>
            </div>
            <div class="col-half">
              <div class="input-group">
                <select>
                  <option>01 Jan</option>
                  <option>02 Jan</option>
                </select>
                <select>
                  <option>2015</option>
                  <option>2016</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <button>Enviar</button>
            {/* <input type="submit">Enviar</input> */}
          </div>
        </form>
      </div>
    </section>
  );
};
