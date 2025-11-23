import React from "react";

function Team() {
    return(
        <div className="container">
            <div className="row p-3 mt-5 border-top">
                <h1 className=" text-center">
                    Owner
                </h1>
            </div>

            <div className="row  p-3 text-muted" style={{lineHeight: "1.8", fontSize:"1.2em"}}>
                <div className="col-6 p-5 text-center">
                    <img src="media/VishnuSINGH.png" style={{borderRadius:"100%", width: "73%", height:"83%"}}/>
                    <h4 className="mt-4">Vishnu Singh</h4>
                    <h6>Full Stack Web Developer</h6>
                    
                </div>
                <div className="col-6 p-3" >

                    <p>My name is Vishnu Singh, currently pursuing B.Tech in Computer Science Engineering from UEM Jaipur.</p> 
                    <p> I am passionate about Full Stack Development, IoT, and Machine Learning, and I have built several projects in these domains, including some amazing design-focused web applications. I have participated in six hackathons so far and proudly won three of them. I also hold a patent for my work.</p>
                    <p> Apart from that, I have represented myself at events like RoboWar and RoboSoccer at IIT Delhi, along with similar competitions at various institutes.</p>
                    <p >Connect on <a href="https://www.linkedin.com/in/vishnu-singh-376089271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target="_blank" style ={{textDecoration: "none"}}>Linkedin</a> / <a href="https://mail.google.com/mail/?view=cm&fs=1&to=singhvishnu18629@gmail.com" style ={{textDecoration: "none"}} target="_blank">Gmail</a>
</p>
                </div>
            </div>
        </div>
    )
}
export default Team;