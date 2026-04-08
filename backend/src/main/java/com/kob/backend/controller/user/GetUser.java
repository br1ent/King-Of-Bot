package com.kob.backend.controller.user;

import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetUser {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping("/getuser")
    public List<User> getUser() {
        return userMapper.selectList(null);
    }
}
