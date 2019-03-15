var jsHotel = {
    hotelName: "JavaScript Hotel",
    roomTypes: ["Twin", "Single", "Double", "Queen", "King"],
    roomPrices: [75, 85, 100, 150, 200],
    availableRoomNumbers: [
        [101, 102, 103, 104],
        [105, 106, 107, 108],
        [201, 202, 203, 204],
        [301, 302, 303],
        [304, 305]
    ],
    bookedRooms: [],

    totalRoomCount: function() {
        var totalRoomCounter = 0;
        for (var i = 0; i < this.roomTypes.length; i++) {
            totalRoomCounter += this.availableRoomNumbers[i].length;
        }
        return totalRoomCounter;
    } 
};
