package br.com.ufc.tracking.controller.dto;

import br.com.ufc.tracking.model.User;

public class UserResponse {

    private Long id;
    private String name;
    private String address;
    private String email;
    private String number;

    public static UserResponse converter(User p) {
        var usr = new UserResponse();
        usr.setId(p.getId());
        usr.setName(p.getName());
        usr.setAddress(p.getAddress());
        usr.setEmail(p.getEmail());
        usr.setNumber(p.getNumber());
        return usr;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
