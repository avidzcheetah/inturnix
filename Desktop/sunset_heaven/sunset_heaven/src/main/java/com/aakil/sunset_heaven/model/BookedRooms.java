package com.aakil.sunset_heaven.model;

import java.time.LocalDate;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class BookedRooms {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long bookingId;
	@Column(name="Check_In")
	private LocalDate checkInDate;
	@Column(name="Check_Out")
	private LocalDate checkOutDate;
	@Column(name="Guest_FullName")
	private String guestFullName;
	@Column(name="Guest_Email")
	private String guestEmail;
	@Column(name="Adults")
	private int NumOfAdults;
	@Column(name="Children")
	private int NumOfChildren;
	@Column(name="TotalGuset")
	private int TotalNoGuest;
	@Column(name="Confirmation_Code")
	private String bookingConfirmationCode;
	@ManyToOne(fetch=FetchType.LAZY)
	private Rooms room;
	
}
