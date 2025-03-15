package com.aakil.sunset_heaven.controller;

import java.io.IOException;
import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;


import javax.sql.rowset.serial.SerialBlob;

import com.aakil.sunset_heaven.DTO.DataTransferObject;
import com.aakil.sunset_heaven.model.Rooms;
import com.aakil.sunset_heaven.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {
@Autowired
RoomService roomservice;

@PostMapping
public void AddRoom(
		@RequestParam ("roomPhoto") MultipartFile roomPhoto,
		@RequestParam ("roomType") String roomType,
		@RequestParam ("roomPrice") BigDecimal roomPrice) {
	Rooms saveroom=new Rooms();
	saveroom.setRoomPrice(roomPrice);
	saveroom.setRoomType(roomType);
	try {
    byte[] photoBytes = roomPhoto.getBytes();
    Blob photoBlob = new SerialBlob(photoBytes);
    saveroom.setRoomPhoto(photoBlob);
	}
	catch(IOException | SQLException e) {
		System.out.print("error");
	}

	roomservice.addRooms(saveroom);
	
}
@GetMapping("/getallrooms")
public List <DataTransferObject> getallRooms(){ 

	return roomservice.getallRooms();	
}
@GetMapping("/getbyid")
public DataTransferObject getRoomById(@RequestParam("roomId") int roomId){
	return roomservice.getRoomById(roomId);
} 

@GetMapping("/getbytype")
public List <DataTransferObject> getRoomByType(@RequestParam("roomType") String roomType){
	return  roomservice.getRoomByType(roomType);
} 

@PutMapping("/replaceroom/{roomId}")
public void  Replaceroom(@RequestParam ("roomPhoto") MultipartFile roomPhoto,
		@RequestParam ("roomType") String roomType,
		@RequestParam ("roomPrice") BigDecimal roomPrice, @PathVariable int roomId) {
	Rooms replaceroom= new Rooms();
	replaceroom.setRoomPrice(roomPrice);
	replaceroom.setRoomType(roomType);
	try {
	    byte[] photoBytes = roomPhoto.getBytes(); 
	    Blob photoBlob = new SerialBlob(photoBytes);
	    replaceroom.setRoomPhoto(photoBlob);
		}
		catch(IOException | SQLException e) {
			System.out.print("error");
		}
	 roomservice.replaceroom(roomId,replaceroom);
	
}
@DeleteMapping("/delete/{roomId}")
public void deleteRoom(@PathVariable int roomId) {
   roomservice.deleteroom(roomId);	 
}

}
