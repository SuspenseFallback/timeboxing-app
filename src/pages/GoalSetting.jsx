import React from "react";
import "./GoalSetting.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GoalSetting = ({ user }) => {
  return (
    <>
      <div className="page first goal-setting">
        <h1 className="header">Goal setting</h1>
        <Tabs defaultValue="daily" className="tabs-panel">
          <TabsList className="tab-panel-selector">
            <TabsTrigger value="daily">Daily goals</TabsTrigger>
            <TabsTrigger value="weekly">Weekly goals</TabsTrigger>
            <TabsTrigger value="6-month">6-monthly goals</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">Daily goals</TabsContent>
          <TabsContent value="weekly">Weekly goals</TabsContent>
          <TabsContent value="6-month">6-monthly goals</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default GoalSetting;
