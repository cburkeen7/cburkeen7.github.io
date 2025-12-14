// Cole Burkeen
// 12-10-23
// IT-145
// Create the Driver class with the required methods and functionality for the Grazioso Salvare application.

import java.util.ArrayList;
import java.util.Scanner;

public class Driver {

    // ArrayLists
    private static ArrayList<Dog> dogList = new ArrayList<Dog>();
    private static ArrayList<Monkey> monkeyList = new ArrayList<Monkey>();

    // Instance variable(s)
    private static Scanner scanner = new Scanner(System.in);  // Scanner object for taking in user input.

    // Main method
    public static void main(String[] args) {
        initializeDogList();
        initializeMonkeyList();
        String menuChoice ="";
        // Menu loop
        while(!(menuChoice.equalsIgnoreCase("q"))) { // Menu loop will continue as long as the menu choice is not q(option to exit app).
            displayMenu();
            menuChoice = scanner.nextLine();// Take a menu option as a character input from the user

            // Select the menu option based on user input
            switch (menuChoice){
                case "1":
                    intakeNewDog(scanner);  // Call intakeNewDog method
                    break;
                case "2":
                    intakeNewMonkey(scanner);  // Call intakeNewMonkey method
                    break;
                case "3":
                    reserveAnimal(scanner);  // Call reserveAnimal method
                    break;
                case "4":
                    printAnimals("dogs");  // Call printAnimals method for printing list of all dogs
                    break;
                case "5":
                    printAnimals("monkeys");  // Call printAnimals method for printing list of all monkeys.
                    break;
                case "6":
                    printAnimals("all");  // Call printAnimals method for printing list of all animals that are not reserved.
                    break;
                default:
                    if (!(menuChoice.equalsIgnoreCase("q"))) {
                        System.out.println("Please enter a valid menu option!");  // Print an error message if input is not one of the menu options
                    }
            }

        }
        System.out.println("Application has been  exited");  // Used for testing to let user know the program is exited when q is entered

    }

    // This method prints the menu options
    public static void displayMenu() {
        System.out.println("\n\n");
        System.out.println("\t\t\t\tRescue Animal System Menu");
        System.out.println("[1] Intake a new dog");
        System.out.println("[2] Intake a new monkey");
        System.out.println("[3] Reserve an animal");
        System.out.println("[4] Print a list of all dogs");
        System.out.println("[5] Print a list of all monkeys");
        System.out.println("[6] Print a list of all animals that are not reserved");
        System.out.println("[q] Quit application");
        System.out.println();
        System.out.println("Enter a menu selection");
    }


    // Adds dogs to a list for testing
    public static void initializeDogList() {
        Dog dog1 = new Dog("Spot", "German Shepherd", "male", "1", "25.6", "05-12-2019", "United States", "intake", false, "United States");
        Dog dog2 = new Dog("Rex", "Great Dane", "male", "3", "35.2", "02-03-2020", "United States", "Phase I", false, "United States");
        Dog dog3 = new Dog("Bella", "Chihuahua", "female", "4", "25.6", "12-12-2019", "Canada", "in service", false, "Canada");

        dogList.add(dog1);
        dogList.add(dog2);
        dogList.add(dog3);
    }


    // Adds monkeys to a list for testing
    public static void initializeMonkeyList() {
        Monkey monkey1 = new Monkey("Ray", "13","20","20","Capuchin","Male", "5", "40", "11-23-2023","United States","in service",false, "United States");
        Monkey monkey2 = new Monkey("Nelson", "25","15","15","Squirrel monkey","Male", "6", "60", "11-23-2023","United States","intake",false, "United States");
        Monkey monkey3 = new Monkey("Mary", "30","16","16","Marmoset","Female", "6", "70", "11-23-2023","United States","intake",false, "United States");

        // Add monkeys to the list
        monkeyList.add(monkey1);
        monkeyList.add(monkey2);
        monkeyList.add(monkey3);
    }


    //  intakeNewDog method
    public static void intakeNewDog(Scanner scanner) {
        System.out.println("What is the dog's name?");
        String name = scanner.nextLine();

        // Make sure the dog is not already in the system by checking for a match to the name entered by the user
        for(Dog dog: dogList) {
            if(dog.getName().equalsIgnoreCase(name)) {
                System.out.println("\n\nThis dog is already in our system\n\n");
                return; //returns to menu
            }
        }

        System.out.println("What breed is the dog?");
        String breed = scanner.nextLine();
        System.out.println("Is the dog Male or Female?");
        String gender = scanner.nextLine();
        System.out.println("What is the dog's age?");
        String age = scanner.nextLine();
        System.out.println("What is the dog's weight?");
        String weight = scanner.nextLine();
        System.out.println("What is the acquisition date?");
        String acquisitionDate = scanner.nextLine();
        System.out.println("What is the acquisition country?");
        String acquisitionCountry = scanner.nextLine();
        System.out.println("What is the dog's training status?");
        String trainingStatus = scanner.nextLine();
        System.out.println("Is the dog reserved?");
        boolean reserved = scanner.nextBoolean();
        scanner.nextLine();
        System.out.println("What is the dog's in service country?");
        String inServiceCountry = scanner.nextLine();

        // Create new dog object based on user input.
        Dog newDog = new Dog(name, breed, gender, age, weight, acquisitionDate, acquisitionCountry, trainingStatus, reserved, inServiceCountry);
        dogList.add(newDog);  // Add new dog object to the dog array list.
    }


        // intakeNewMonkey method
        public static void intakeNewMonkey(Scanner scanner) {

            // Take all necessary information about the monkey from the user

            System.out.println("What is the monkey's name?");
            String name = scanner.nextLine();

            // Check the monkey's name to see if it is already in the system.
            for(Monkey monkey : monkeyList) {
                if(monkey.getName().equalsIgnoreCase(name)) {
                    // If already in the system, print an error message
                    System.out.println("\n\nThis monkey is already in our system\n\n");
                    return; //returns to menu
                }
            }
            System.out.println("What species is the monkey?");
            String  species= scanner.nextLine();

            // Make sure the species is eligible for training.
            if (!(species.equalsIgnoreCase("capuchin") ||species.equalsIgnoreCase("guenon") ||
                    species.equalsIgnoreCase("macaque") || species.equalsIgnoreCase("marmoset")
                    || species.equalsIgnoreCase("squirrel monkey") ||
                    species.equalsIgnoreCase("tamarin"))) {

                // If not eligable for training, print an error message
                System.out.println("\n\nThis species is not eligible for training\n\n");
                return;  // return to menu
            }

            System.out.println("Is the monkey Male or Female?");
            String gender = scanner.nextLine();
            System.out.println("What is the monkey's age?");
            String age = scanner.nextLine();
            System.out.println("What is the monkey's weight?");
            String weight = scanner.nextLine();
            System.out.println("How long is the monkey's tail");
            String tailLength = scanner.nextLine();
            System.out.println("What is the monkey's height?");
            String height = scanner.nextLine();
            System.out.println("What is the monkey's body length?");
            String bodyLength = scanner.nextLine();
            System.out.println("What is the acquisition date?");
            String acquisitionDate = scanner.nextLine();
            System.out.println("What is the acquisition country?");
            String acquisitionCountry = scanner.nextLine();
            System.out.println("What is the monkey's training status?");
            String trainingStatus = scanner.nextLine();
            System.out.println("Is the monkey reserved?");
            boolean reserved = scanner.nextBoolean();
            scanner.nextLine();
            System.out.println("What is the monkey's in service country?");
            String inServiceCountry = scanner.nextLine();

            // Create the new monkey object based on user input
            Monkey newMonkey = new Monkey(name, tailLength, height, bodyLength, species, gender, age, weight, acquisitionDate, acquisitionCountry, trainingStatus,reserved,inServiceCountry);
            monkeyList.add(newMonkey);   // Add the new monkey object to the monkey array list
        }

        // reserveAnimal method.
    public static void reserveAnimal(Scanner scanner) {
            System.out.println("Would you like to reserve a dog or a monkey");  // Ask the user what type of animal they would like to reserve
            String animal = scanner.nextLine();
            System.out.println("What country would you like to search");  // Ask the user what country they want to search for the selected animal
            String country = scanner.nextLine();

            System.out.println("Searching for available " + animal +"s in " + country+ "!");

            // If user chose dog, search for a dog in the dog Arraylist .
            if (animal.equalsIgnoreCase("dog")) {
                for (Dog dog : dogList) {
                    // If a dog is found that is not reserved, its location matches the country entered by the user, and it is in service(fully trained).
                    if (dog.getInServiceLocation().equalsIgnoreCase(country) && !dog.getReserved() && dog.getTrainingStatus().equalsIgnoreCase("in service")) {
                        dog.setReserved(true);  // Set the reserved status to true
                        // Print a message letting the user know a dog has been reserved.
                        System.out.println("Dog found! " + dog.getName() + " the " + dog.getBreed() + " has been reserved.");

                        return;  // Exit the method as soon as a dog is found.
                    }
                }
                // If there are no available dogs in the specific country, print an error message.
                System.out.println("No avalable dogs in " + country);
            }
            else if (animal.equalsIgnoreCase("monkey")) {
                for (Monkey monkey : monkeyList) {

                   // If a monkey is found that is not reserved, its location matches the country entered by the user, and it is in service(fully trained)
                    if (monkey.getInServiceLocation().equalsIgnoreCase(country) && !monkey.getReserved() && monkey.getTrainingStatus().equalsIgnoreCase("in service")) {
                        monkey.setReserved(true); // Set the reserved status to true
                        // Print a message letting the user know a monkey has been reserved.
                        System.out.println("Monkey found! " + monkey.getName() + " the " + monkey.getSpecies() + " has been reserved.");
                        return;  // Exit the method as soon as a monkey is found.
                    }
                }
                // If no monkeys are available the country user selected, print an error message
                System.out.println("No avalable monkeys in " + country);

                // Print an error message if user enters an animal other the dog or monkey
            } else {
                System.out.println("No animals matching your search are available at this time");
            }
        }


	// printAnimals method
        public static void printAnimals(String listType) {
            /* The variables availableDogs and availableMonkeys are used to determine when to print an error message
            when printing a list of all available animals.*/
            int availableMonkeys = 0;
            int availableDogs = 0;

            // Print information about all the dogs
            if (listType.equals("dogs")){
               System.out.println("This option needs to be implemented!");
                    System.out.println();

                }
                // Print information about all the monkeys
            else if (listType.equals("monkeys")) {
                System.out.println("This option needs to be implenented!");
                System.out.println();



                // Print a list of information about all dogs and monkeys that are in service and availible(not reserved)
                // Included information: the animal name, status, acquisition country and if the animal is reserved.
            } else if (listType.equals("all")){
                    System.out.println("List of Available Animals");
                    System.out.println();

                for(Dog dog: dogList) {
                    // If the dog is in service and availible, print info about that dog
                    if (dog.getTrainingStatus().equalsIgnoreCase("in service") && !dog.getReserved()) {
                        System.out.println("Animal Name: " + dog.getName());
                        System.out.println("Status: " + dog.getTrainingStatus());
                        System.out.println("Acquisition Country: " + dog.getAcquisitionLocation());
                        if (!dog.getReserved()) {
                            System.out.println("Reserved: No");  // Print this message if the dog is not reserved(reserved = false)

                        } else {
                            System.out.println("Reserved: Yes");  // Print this message if the dog is reserved(reserved = true)
                        }
                        System.out.println();
                        availableDogs++;  // Increase the count of availableDogs by 1

                        // If dog is not in service and/or not available, continue the loop.
                    } else {
                        continue;
                    }

                }
                    for(Monkey monkey: monkeyList) {

                        // If the monkey is in service and available, print info about that monkey
                        if (monkey.getTrainingStatus().equalsIgnoreCase("in service") && !monkey.getReserved()) {
                            System.out.println("Animal Name: " + monkey.getName());
                            System.out.println("Status: " + monkey.getTrainingStatus());
                            System.out.println("Acquisition Country: " + monkey.getAcquisitionLocation());
                            if (!monkey.getReserved()) {
                                System.out.println("Reserved: No");  // Print this message if the monkey is not reserved(reserved = false)

                            } else {
                                System.out.println("Reserved: Yes");  // Print this message if the monkey is reserved(reserved = true)
                            }
                            System.out.println();
                            availableMonkeys++;  // Increase the count of availableMonkeys by 1
                            // If monkey is not in service and/or not available, continue the loop.
                        } else {
                            continue;
                        }

                    }
                }  // If no dogs or monkeys are available, print an error message
                    if (availableMonkeys == 0  && availableDogs == 0 && listType.equals("all")){
                        System.out.println("No animals available");
                    }
            }

}

