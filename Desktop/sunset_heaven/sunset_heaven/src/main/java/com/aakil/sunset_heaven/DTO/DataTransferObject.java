package com.aakil.sunset_heaven.DTO;

import java.math.BigDecimal;


public class DataTransferObject {
	private int roomId;
	private String roomType;
	private BigDecimal roomPrice;
	private boolean isBooked;
	private String roomPhoto;
	
	public DataTransferObject(int roomId, String roomType, BigDecimal roomPrice, boolean isBooked, String roomPhoto) {
		super();
		this.roomId = roomId;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
		this.isBooked = isBooked;
		this.roomPhoto = roomPhoto;
	}

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

	public String getRoomPhoto() {
		return roomPhoto;
	}

	public void setRoomPhoto(String roomPhoto) {
		this.roomPhoto = roomPhoto;
	}
	
	

}
