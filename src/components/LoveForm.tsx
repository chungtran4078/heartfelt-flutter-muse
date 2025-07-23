import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Heart, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const LoveForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false); // false = "Yes", true = "No"
  const [person1, setPerson1] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
  });
  const [person2, setPerson2] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
  });

  const handleDateInput = (value: string, field: 'day' | 'month' | 'year', person: 'person1' | 'person2') => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Apply validation based on field
    let validatedValue = numericValue;
    if (field === 'day') {
      const day = parseInt(numericValue);
      if (day > 31) validatedValue = '31';
      if (day < 1 && numericValue !== '') validatedValue = '1';
    } else if (field === 'month') {
      const month = parseInt(numericValue);
      if (month > 12) validatedValue = '12';
      if (month < 1 && numericValue !== '') validatedValue = '1';
    } else if (field === 'year') {
      const year = parseInt(numericValue);
      if (year < 1900 && numericValue !== '') validatedValue = '1900';
    }

    if (person === 'person1') {
      setPerson1({ ...person1, [field]: validatedValue });
    } else {
      setPerson2({ ...person2, [field]: validatedValue });
    }
  };

  const handleSubmit = () => {
    if (isConfirmed && person1.name && person2.name) {
      // Handle form submission
      console.log("Love compatibility check:", { person1, person2 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary animate-heart-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
              Love Compatibility
            </h1>
            <Heart className="w-8 h-8 text-primary animate-heart-pulse" />
          </div>
          <p className="text-muted-foreground text-lg">
            Discover the magic between two hearts
          </p>
          <div className="flex justify-center mt-4">
            <Link to="/detection">
              <Button variant="outline" size="sm" className="gap-2">
                <Camera className="w-4 h-4" />
                Try Object Detection
              </Button>
            </Link>
          </div>
        </div>

        <Card className="bg-gradient-card shadow-romantic border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-foreground">
              Are you sure?
            </CardTitle>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-white rounded-full p-1 shadow-soft border">
                  <Button
                    variant={!isConfirmed ? "romantic" : "ghost"}
                    size="sm"
                    className="rounded-full px-6"
                    onClick={() => setIsConfirmed(false)}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={isConfirmed ? "romantic" : "ghost"}
                    size="sm" 
                    className="rounded-full px-6"
                    onClick={() => setIsConfirmed(true)}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Conditional rendering based on "Are you sure?" selection */}
            {!isConfirmed ? (
              // When "Yes" is selected (isConfirmed = false), show only Person 1 centered
              <div className="flex justify-center">
                <div className="w-full max-w-md space-y-6">
                  <div className="text-center">
                    <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="text-xl font-semibold text-foreground">Name 1:</h3>
                  </div>
                  <Input
                    placeholder="Enter first name"
                    value={person1.name}
                    onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                    className="text-center text-lg py-6 rounded-xl bg-white/50 border-primary/20 focus:border-primary/50"
                  />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4 className="text-lg font-medium text-foreground">Date 1:</h4>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Input
                        placeholder="25"
                        value={person1.day}
                        onChange={(e) => handleDateInput(e.target.value, 'day', 'person1')}
                        className="w-16 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={2}
                      />
                      <span className="text-2xl text-muted-foreground self-center">/</span>
                      <Input
                        placeholder="12"
                        value={person1.month}
                        onChange={(e) => handleDateInput(e.target.value, 'month', 'person1')}
                        className="w-16 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={2}
                      />
                      <span className="text-2xl text-muted-foreground self-center">/</span>
                      <Input
                        placeholder="1995"
                        value={person1.year}
                        onChange={(e) => handleDateInput(e.target.value, 'year', 'person1')}
                        className="w-20 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // When "No" is selected (isConfirmed = true), show both persons
              <div className="grid md:grid-cols-2 gap-8">
                {/* Person 1 */}
                <div className="space-y-6">
                  <div className="text-center">
                    <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="text-xl font-semibold text-foreground">Name 1:</h3>
                  </div>
                  <Input
                    placeholder="Enter first name"
                    value={person1.name}
                    onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                    className="text-center text-lg py-6 rounded-xl bg-white/50 border-primary/20 focus:border-primary/50"
                  />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4 className="text-lg font-medium text-foreground">Date 1:</h4>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Input
                        placeholder="25"
                        value={person1.day}
                        onChange={(e) => handleDateInput(e.target.value, 'day', 'person1')}
                        className="w-16 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={2}
                      />
                      <span className="text-2xl text-muted-foreground self-center">/</span>
                      <Input
                        placeholder="12"
                        value={person1.month}
                        onChange={(e) => handleDateInput(e.target.value, 'month', 'person1')}
                        className="w-16 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={2}
                      />
                      <span className="text-2xl text-muted-foreground self-center">/</span>
                      <Input
                        placeholder="1995"
                        value={person1.year}
                        onChange={(e) => handleDateInput(e.target.value, 'year', 'person1')}
                        className="w-20 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Person 2 */}
                <div className="space-y-6">
                  <div className="text-center">
                    <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="text-xl font-semibold text-foreground">Name 2:</h3>
                  </div>
                  <Input
                    placeholder="Enter second name"
                    value={person2.name}
                    onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                    className="text-center text-lg py-6 rounded-xl bg-white/50 border-primary/20 focus:border-primary/50"
                  />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4 className="text-lg font-medium text-foreground">Date 2:</h4>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Input
                        placeholder="25"
                        value={person2.day}
                        onChange={(e) => handleDateInput(e.target.value, 'day', 'person2')}
                        className="w-16 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={2}
                      />
                      <span className="text-2xl text-muted-foreground self-center">/</span>
                      <Input
                        placeholder="12"
                        value={person2.month}
                        onChange={(e) => handleDateInput(e.target.value, 'month', 'person2')}
                        className="w-20 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={2}
                      />
                      <span className="text-2xl text-muted-foreground self-center">/</span>
                      <Input
                        placeholder="1999"
                        value={person2.year}
                        onChange={(e) => handleDateInput(e.target.value, 'year', 'person2')}
                        className="w-20 text-center py-4 rounded-lg bg-white/50 border-primary/20"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center pt-6">
              <Button
                variant="romantic"
                size="lg"
                onClick={handleSubmit}
                disabled={!isConfirmed || !person1.name || !person2.name}
                className="px-12 py-6 text-lg rounded-full"
              >
                <Heart className="w-5 h-5 mr-2" />
                Check Compatibility
                <Heart className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoveForm;