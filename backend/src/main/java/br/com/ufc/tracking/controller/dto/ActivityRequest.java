package br.com.ufc.tracking.controller.dto;

public class ActivityRequest {
    private Long user;
    private String activity;

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }
}
