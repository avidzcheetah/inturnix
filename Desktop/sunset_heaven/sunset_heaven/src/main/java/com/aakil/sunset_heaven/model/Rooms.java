package com.aakil.sunset_heaven.model;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;

@Entity
public class Rooms {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int roomId;
	private String roomType;
	private BigDecimal roomPrice;
	private boolean isBooked=false;
	@Lob

	private Blob roomPhoto;
	 @JsonIgnore 
	@OneToMany(mappedBy ="room",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	private List <BookedRooms>  bookings;

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public BigDecimal getRoomPrice() {
		return roomPrice;
	}

	public void setRoomPrice(BigDecimal roomPrice) {
		this.roomPrice = roomPrice;
	}

	public boolean isBooked() {
		return isBooked;
	}

	public void setBooked(boolean isBooked) {
		this.isBooked = isBooked;
	}

	public Blob getRoomPhoto() {
		return roomPhoto;
	}

	public void setRoomPhoto(Blob roomPhoto) {
		this.roomPhoto = roomPhoto;
	}

	public List<BookedRooms> getBookings() {
		return bookings;
	}

	public void setBookings(List<BookedRooms> bookings) {
		this.bookings = bookings;
	}
	
	
	
	
	
}
