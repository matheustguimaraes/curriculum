package br.com.ufc.tracking.controller;

import br.com.ufc.tracking.controller.dto.UserRequest;
import br.com.ufc.tracking.controller.dto.UserResponse;
import br.com.ufc.tracking.model.User;
import br.com.ufc.tracking.repository.ActivityCustomRepository;
import br.com.ufc.tracking.repository.ActivityRepository;
import br.com.ufc.tracking.repository.UserCustomRepository;
import br.com.ufc.tracking.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final UserCustomRepository userCustomRepository;
    private final ActivityCustomRepository activityCustomRepository;
    private final ActivityRepository activityRepository;

    public UserController(UserRepository userRepository, UserCustomRepository userCustomRepository,
                          ActivityRepository activityRepository, ActivityCustomRepository activityCustomRepository) {
        this.userRepository = userRepository;
        this.userCustomRepository = userCustomRepository;
        this.activityRepository = activityRepository;
        this.activityCustomRepository = activityCustomRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public String index() {
        return "Spring boot is running";
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user")
    public List<UserResponse> findAll() {
        var usr = userRepository.findAll();
        return usr
                .stream()
                .map(UserResponse::converter)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{id}")
    public UserResponse findById(@PathVariable("id") Long id) {
        var usr = userRepository.getOne(id);
        return UserResponse.converter(usr);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user")
    public void savePerson(@RequestBody UserRequest usr) {
        var p = new User();
        p.setName(usr.getName());
        p.setAddress(usr.getAddress());
        p.setEmail(usr.getEmail());
        p.setNumber(usr.getNumber());
        userRepository.save(p);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/user/{id}")
    public void updatePerson(@PathVariable("id") Long id, @RequestBody UserRequest usr) throws Exception {
        var p = userRepository.findById(id);

        if (p.isPresent()) {
            var usrSave = p.get();
            usrSave.setName(usr.getName());
            usrSave.setAddress(usr.getAddress());
            usrSave.setEmail(usr.getEmail());
            usrSave.setNumber(usr.getNumber());
            userRepository.save(usrSave);
        } else {
            throw new Exception("Pessoa Não encontrada");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Long id) throws Exception {
        var usr = userRepository.findById(id);

        if (usr.isPresent()) {
            activityRepository.deleteById(id);
            userRepository.deleteById(id);
        } else {
            throw new Exception("Pessoa não deletada");
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/filter")
    public List<UserResponse> findUserByName(@RequestParam("name") String name) {
        return this.userRepository.findByNameContains(name)
                .stream()
                .map(UserResponse::converter)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/filter/custom")
    public List<UserResponse> findUserByCustom(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "sobrenome", required = false) String sobrenome
    ) {
        return this.userCustomRepository.find(id, name, sobrenome)
                .stream()
                .map(UserResponse::converter)
                .collect(Collectors.toList());
    }
}
