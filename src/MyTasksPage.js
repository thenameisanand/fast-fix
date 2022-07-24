import React from "react";
import MyTasks from "./MyTasks";
import "./MyTasks.css";
import "./MyTasksPage.css";
function MyTasksPage() {
  return (
    <div className="MyTasksPage">
      <h1>My Tasks</h1>
      <div className="MyTasksPage__container">
        <div className="MyTasksPage__heading"></div>
        <div className="MyTasksPage__center">
          <div className="MyTasksPage__centerLeft">
            <div className="MyTasksPage__card">
      <div className="card__card"><MyTasks/>
      <MyTasks />
      </div> 
       
            </div>

            <h1></h1>
            <p></p>
          </div>
          <div className="MyTasksPage__centerRight">
            <img src="https://images.unsplash.com/photo-1551825687-f9de1603ed8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"></img>

            <div className="centerRight__below">
              <h1>Be your own boss!</h1>
              <p>
                Work how, when, and where you want. Offer services in 50+
                categories and set a flexible schedule and work area
              </p>
            </div>
            <div className="centerRight__below">
              <h1>Set your own rates</h1>
              <p>
                Work how, when, and where you want. Offer services in 50+
                categories and set a flexible schedule and work area
              </p>
            </div>
            <div className="centerRight__below">
              <h1>Grow your business</h1>
              <p>
                We connect you with clients in your area, and ways to market
                yourself — so you can focus on what you do best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTasksPage;
