package com.aakil.sunset_heaven.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.aakil.sunset_heaven.DTO.DataTransferObject;
import com.aakil.sunset_heaven.model.Rooms;
import com.aakil.sunset_heaven.repository.RoomRepository;

@Service
public class RoomService {
  @Autowired
	private RoomRepository roomrepository;
  
   public void addRooms(Rooms room){
    	roomrepository.save(room);
    }

public List<DataTransferObject> getallRooms() {
	
	return roomrepository.findAll().stream().map(t -> {
		try {
			return DTO(t);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}).collect(Collectors.toList());
} 

private DataTransferObject DTO(Rooms rooms) throws IOException, SQLException {
	if(rooms.getRoomPhoto()==null) {
		return null;
	}
	 try (InputStream inputStream = rooms.getRoomPhoto().getBinaryStream()) {
		 byte[] bytes = inputStream.readAllBytes();
			String base64= Base64.getEncoder().encodeToString(bytes);
			
			return new DataTransferObject(rooms.getRoomId(),rooms.getRoomType(),rooms.getRoomPrice(),rooms.isBooked(),base64);
	 }
	 catch (SQLException | IOException e) {
	        e.printStackTrace();
	        return null;

	
}
}
@Transactional
public DataTransferObject getRoomById(int roomId) {
	if(roomrepository.findById(roomId)==null) {
		return null;
	};
	Rooms sroom=roomrepository.getById(roomId);
	try (InputStream inputStream = sroom.getRoomPhoto().getBinaryStream()) {
		 byte[] bytes = inputStream.readAllBytes();
			String base64= Base64.getEncoder().encodeToString(bytes);
			return new DataTransferObject(sroom.getRoomId(),sroom.getRoomType(),sroom.getRoomPrice(),sroom.isBooked(),base64); 
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return null; 
	
	 
}

public List<DataTransferObject> getRoomByType(String roomType) {
	
	List<Rooms> Sroom=roomrepository.findByRoomType(roomType);
     if(Sroom==null) {
    	return null; 
     }
     
    
     List<DataTransferObject> dtoList=Sroom.stream().map(room->{
    	try {
    		return DTO(room);
    	} catch(IOException| SQLException e) {
    		 e.printStackTrace();
    		return null;
    		
    	}
     }).collect(Collectors.toList());
     
     return dtoList;
     }
@Transactional
public void replaceroom(int roomId, Rooms replaceroom) {
	  if(roomrepository.existsById(roomId)) {
		  Rooms croom=roomrepository.getById(roomId);
		  croom.setRoomPrice(replaceroom.getRoomPrice());
		  croom.setRoomType(replaceroom.getRoomType());
		  croom.setRoomPhoto(replaceroom.getRoomPhoto());
		  roomrepository.save(croom);
	  }
	
}

public void deleteroom(int roomId) {
	roomrepository.deleteById(roomId);
	
}



}
