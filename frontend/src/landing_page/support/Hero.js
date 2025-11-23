import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5 mx-5 row" id="supportWrapper">
        <div className="col-6"><h4> &nbsp; &nbsp; &nbsp; &nbsp; Support Portal</h4></div>
        <div className="col-2"></div>
        <div className="col-4 fs-5" ><a href="" >Track Tickets</a></div>
      </div>
      <div className="row p-5 mx-5">
        <div className="col-6 p-5">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input placeholder="Eg. how do I activate F&O" />
          <br />
          <a href="">Track account opening</a> &nbsp; &nbsp;  &nbsp;
          <a href="">Track segment activation</a>&nbsp; &nbsp; &nbsp;
          <a href="">Intraday margins</a>&nbsp; &nbsp; &nbsp;
          <a href="">Kite user manual</a>&nbsp;
        </div>
        <div className="col-2"></div>
        <div className="col-4 p-3 mt-4">
          <h1 className="fs-3 ">Featured</h1>
          <ol>
            <li>
              <a href="">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;