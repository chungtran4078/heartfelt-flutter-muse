import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Recognition = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Link to="/detection">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Capture Area */}
        <Card className="bg-gradient-card shadow-romantic border-0 p-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Image Capture Box */}
            <div className="w-80 h-60 bg-background border-4 border-foreground rounded-3xl flex items-center justify-center">
              <div className="text-center space-y-2">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-xl font-medium text-foreground">
                  Capture image here
                </p>
              </div>
            </div>

            {/* Names and Dates */}
            <div className="w-full flex justify-between items-center px-8">
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold text-foreground">John Doe</h2>
                <p className="text-2xl text-muted-foreground">25/12/1995</p>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold text-foreground">Chloe Jenny</h2>
                <p className="text-2xl text-muted-foreground">25/12/1999</p>
              </div>
            </div>

            {/* Processing Section */}
            <div className="w-full space-y-4">
              <p className="text-2xl font-medium text-foreground">Processing...</p>
              <Progress 
                value={progress} 
                className="w-full h-6 bg-background border-2 border-foreground"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Recognition;