// Cole Burkeen
// 12-10-23
// IT-145
// Create a class called monkey that inherits from the RescueAnimal class and has all the required attributes and methods

public class Monkey extends RescueAnimal {

    // Variables
    private String tailLength;
    private String height;
    private String bodyLength;
    private String species;


   // Constructor
    public Monkey(String name, String tailLength, String height, String bodyLength, String species, String gender,
                  String age, String weight, String acquisitionDate, String acquisitionCountry,
                  String trainingStatus, boolean reserved, String inServiceCountry) {

        setName(name);
        setTailLength(tailLength);
        setHeight(height);
        setBodyLength(bodyLength);
        setSpecies(species);
        setGender(gender);
        setAge(age);
        setWeight(weight);
        setAcquisitionDate(acquisitionDate);
        setAcquisitionLocation(acquisitionCountry);
        setTrainingStatus(trainingStatus);
        setReserved(reserved);
        setInServiceCountry(inServiceCountry);

    }

    // Getters
    public String getTailLength() {  // Getter for tailLength
        return tailLength;
    }

    public String getBodyLength() {  // Getter for bodyLength
        return bodyLength;
    }


    public String getSpecies() {  // Getter for species
        return species;
    }


    public String getHeight() {  // Getter for height
        return height;
    }

    // Setters
    public void setBodyLength(String bodyLength) {  // Setter for bodyLength
        this.bodyLength = bodyLength;
    }

    public void setTailLength(String tailLength) {  // Setter for tailLength
        this.tailLength = tailLength;
    }
    public void setSpecies(String species) {  // Setter for species
        this.species = species;
    }
    public void setHeight(String height) {  // Setter for height
        this.height = height;
    }

}
