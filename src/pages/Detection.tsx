import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, ArrowLeft, Play, Square } from "lucide-react";
import { Link } from "react-router-dom";

const Detection = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [status, setStatus] = useState("Ready to start detection");

  const handleStartDetection = () => {
    setIsDetecting(true);
    setStatus("Detecting object...");
    // Simulate detection process
    setTimeout(() => {
      setStatus("Object detected!");
    }, 2000);
  };

  const handleStopDetection = () => {
    setIsDetecting(false);
    setStatus("Detection stopped");
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Camera className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">
                {status}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Detection Area */}
        <Card className="bg-gradient-card shadow-romantic border-0 p-8">
          <div className="aspect-video bg-background/50 rounded-2xl border-2 border-dashed border-primary/30 flex items-center justify-center relative overflow-hidden">
            {!isDetecting ? (
              <div className="text-center space-y-4">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
                <p className="text-2xl text-muted-foreground font-medium">
                  Webcam view here
                </p>
                <p className="text-lg text-muted-foreground/70">
                  Click start to begin object detection
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-primary/30 rounded-full flex items-center justify-center">
                    <Camera className="w-16 h-16 text-primary" />
                  </div>
                  <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin border-t-primary"></div>
                </div>
                <p className="text-xl text-foreground font-medium">
                  Scanning for objects...
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            {!isDetecting ? (
              <Button
                variant="romantic"
                size="lg"
                onClick={handleStartDetection}
                className="px-8 py-6 text-lg rounded-full gap-3"
              >
                <Play className="w-6 h-6" />
                Start Detection
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={handleStopDetection}
                className="px-8 py-6 text-lg rounded-full gap-3 border-red-500 text-red-500 hover:bg-red-50"
              >
                <Square className="w-6 h-6" />
                Stop Detection
              </Button>
            )}
          </div>
        </Card>

        {/* Status Information */}
        <Card className="bg-gradient-card shadow-romantic border-0 p-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Detection Status</h3>
            <p className="text-muted-foreground">
              {isDetecting ? "Camera is active and scanning" : "Camera is inactive"}
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className={`w-3 h-3 rounded-full ${isDetecting ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-muted-foreground">
                {isDetecting ? "Live" : "Offline"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Detection;