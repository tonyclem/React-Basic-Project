import React from "react";
import { AiOutlineTwitter, AiFillMail } from "react-icons/ai";

const Staff = ({ workers }) => {
  return (
    <article className="staff-container">
      {workers.map((worker) => {
        const { id, name, roles, image } = worker;

        return (
          <article key={id} className="work-container">
            <img src={image} alt={name} />

            <div>
              <h4>{name}</h4>
              <p>{roles}</p>
              <div className="social">
                <span>
                  <AiFillMail className="icon" /> Email
                </span>
                <span>
                  <AiOutlineTwitter className="icon" />
                  Twitter
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </article>
  );
};

export default Staff;
