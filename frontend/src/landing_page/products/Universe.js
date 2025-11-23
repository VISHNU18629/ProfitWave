import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
        <br/>
        <br/>
        <br/>
      <div className="row text-center mt-5">
        <h1>The ProfitWave Universe</h1>
        <p className="fs-5 text-muted">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/smallcaseLogo.png" className="mb-3"/>
          <p className="text-small text-muted">Our asset management venture<br/>
that is creating simple and transparent index<br/>
funds to help you save for your goals.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/streakLogo.png" style={{height:"58px"}} className="mb-3"/>
          <p className="text-small text-muted">Systematic trading platform<br/>
that allows you to create and backtest<br/>
strategies without coding.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/sensibullLogo.svg" style={{height:"50px"}} className="mb-3"/>
          <p className="text-small text-muted">Options trading platform that lets you<br/>
create strategies, analyze positions, and examine<br/>
data points like open interest, FII/DII, and more.
</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/zerodhaFundhouse.png" style={{height:"65px"}} className="mb-3"/>
          <p className="text-small text-muted">Our asset management venture<br/>
that is creating simple and transparent index<br/>
funds to help you save for your goals.
</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/goldenpiLogo.png" style={{height:"65px"}} className="mb-3"/>
          <p className="text-small text-muted">GoldenPi makes it easy for individual <br/>
          investors in India to buy and sell fixed-income <br/>
          instruments like bonds, debentures, & corporate FDs. 
</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/dittoLogo.png" style={{height:"65px"}} className="mb-3"/>
          <p className="text-small text-muted">Personalized advice on life<br/>
and health insurance. No spam<br/>
and no mis-selling.</p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mt-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;